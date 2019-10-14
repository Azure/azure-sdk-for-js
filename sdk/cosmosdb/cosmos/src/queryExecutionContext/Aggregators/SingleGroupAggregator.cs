//------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//------------------------------------------------------------
namespace Microsoft.Azure.Cosmos.Query
{
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using Microsoft.Azure.Cosmos.CosmosElements;
  using Microsoft.Azure.Cosmos.Query.Aggregation;
  using Newtonsoft.Json;

  /// <summary>
  /// Aggregates all the projections for a single grouping.
  /// </summary>
  internal abstract class SingleGroupAggregator
  {
    /// <summary>
    /// Adds the payload for group by values 
    /// </summary>
    /// <param name="values"></param>
    public abstract void AddValues(CosmosElement values);

    /// <summary>
    /// Forms the final result of the grouping.
    /// </summary>
    public abstract CosmosElement GetResult();

    public static SingleGroupAggregator Create(
        AggregateOperator[] aggregates,
        IReadOnlyDictionary<string, AggregateOperator?> aggregateAliasToAggregateType,
        bool hasSelectValue)
    {
      SingleGroupAggregator aggregateValues;
      if (hasSelectValue)
      {
        if (aggregates != null && aggregates.Any())
        {
          // SELECT VALUE <AGGREGATE>
          aggregateValues = SelectValueAggregateValues.Create(aggregates[0]);
        }
        else
        {
          // SELECT VALUE <NON AGGREGATE>
          aggregateValues = SelectValueAggregateValues.Create(aggregateOperator: null);
        }
      }
      else
      {
        aggregateValues = SelectListAggregateValues.Create(aggregateAliasToAggregateType);
      }

      return aggregateValues;
    }

    /// <summary>
    /// For SELECT VALUE queries there is only one value for each grouping.
    /// This class just helps maintain that and captures the first value across all continuations.
    /// </summary>
    private sealed class SelectValueAggregateValues : SingleGroupAggregator
    {
      private readonly AggregateValue aggregateValue;

      private SelectValueAggregateValues(AggregateValue aggregateValue)
      {
        if (aggregateValue == null)
        {
          throw new ArgumentNullException(nameof(AggregateValue));
        }

        this.aggregateValue = aggregateValue;
      }

      public static SelectValueAggregateValues Create(AggregateOperator? aggregateOperator)
      {
        AggregateValue aggregateValue = AggregateValue.Create(aggregateOperator);
        return new SelectValueAggregateValues(aggregateValue);
      }

      public override void AddValues(CosmosElement values)
      {
        this.aggregateValue.AddValue(values);
      }

      public override CosmosElement GetResult()
      {
        return this.aggregateValue.Result;
      }

      public override string ToString()
      {
        return this.aggregateValue.ToString();
      }
    }

    /// <summary>
    /// For select list queries we need to create a dictionary of alias to group by value.
    /// For each grouping drained from the backend we merge it with the results here.
    /// At the end this class will form a JSON object with the correct aliases and grouping result.
    /// </summary>
    private sealed class SelectListAggregateValues : SingleGroupAggregator
    {
      private readonly IReadOnlyDictionary<string, AggregateValue> aliasToValue;

      private SelectListAggregateValues(IReadOnlyDictionary<string, AggregateValue> aliasToValue)
      {
        this.aliasToValue = aliasToValue;
      }

      public override CosmosElement GetResult()
      {
        Dictionary<string, CosmosElement> aliasToElement = new Dictionary<string, CosmosElement>();
        foreach (KeyValuePair<string, AggregateValue> aliasAndValue in this.aliasToValue)
        {
          string alias = aliasAndValue.Key;
          AggregateValue aggregateValue = aliasAndValue.Value;
          if (aggregateValue.Result != null)
          {
            aliasToElement[alias] = aggregateValue.Result;
          }
        }

        return CosmosObject.Create(aliasToElement);
      }

      public static SelectListAggregateValues Create(IReadOnlyDictionary<string, AggregateOperator?> aggregateAliasToAggregateType)
      {
        Dictionary<string, AggregateValue> groupingTable = new Dictionary<string, AggregateValue>();
        foreach (KeyValuePair<string, AggregateOperator?> aliasToAggregate in aggregateAliasToAggregateType)
        {
          string alias = aliasToAggregate.Key;
          AggregateOperator? aggregateOperator = aliasToAggregate.Value;
          groupingTable[alias] = AggregateValue.Create(aggregateOperator);
        }

        return new SelectListAggregateValues(groupingTable);
      }

      public override void AddValues(CosmosElement values)
      {
        if (!(values is CosmosObject payload))
        {
          throw new ArgumentException("values is not an object.");
        }

        foreach (KeyValuePair<string, AggregateValue> aliasAndValue in this.aliasToValue)
        {
          string alias = aliasAndValue.Key;
          AggregateValue aggregateValue = aliasAndValue.Value;
          aggregateValue.AddValue(payload[alias]);
        }
      }

      public override string ToString()
      {
        return JsonConvert.SerializeObject(this.aliasToValue);
      }
    }

    /// <summary>
    /// With a group by value we need to encapsulate the fact that we have:
    /// 1) aggregate group by values
    /// 2) scalar group by values.
    /// </summary>
    private abstract class AggregateValue
    {
      public abstract void AddValue(CosmosElement aggregateValue);

      public abstract CosmosElement Result { get; }

      public override string ToString()
      {
        return this.Result.ToString();
      }

      public static AggregateValue Create(AggregateOperator? aggregateOperator)
      {
        AggregateValue value;
        if (aggregateOperator.HasValue)
        {
          value = AggregateAggregateValue.Create(aggregateOperator.Value);
        }
        else
        {
          value = ScalarAggregateValue.Create();
        }

        return value;
      }

      private sealed class AggregateAggregateValue : AggregateValue
      {
        private readonly IAggregator aggregator;

        public override CosmosElement Result => this.aggregator.GetResult();

        private AggregateAggregateValue(IAggregator aggregator)
        {
          if (aggregator == null)
          {
            throw new ArgumentNullException(nameof(aggregator));
          }

          this.aggregator = aggregator;
        }

        public override void AddValue(CosmosElement aggregateValue)
        {
          AggregateItem aggregateItem = new AggregateItem(aggregateValue);
          this.aggregator.Aggregate(aggregateItem.Item);
        }

        public static AggregateAggregateValue Create(AggregateOperator aggregateOperator)
        {
          IAggregator aggregator;
          switch (aggregateOperator)
          {
            case AggregateOperator.Average:
              aggregator = new AverageAggregator();
              break;

            case AggregateOperator.Count:
              aggregator = new CountAggregator();
              break;

            case AggregateOperator.Max:
              aggregator = new MinMaxAggregator(isMinAggregation: false);
              break;

            case AggregateOperator.Min:
              aggregator = new MinMaxAggregator(isMinAggregation: true);
              break;

            case AggregateOperator.Sum:
              aggregator = new SumAggregator();
              break;

            default:
              throw new ArgumentException($"Unknown {nameof(AggregateOperator)}: {aggregateOperator}.");
          }

          return new AggregateAggregateValue(aggregator);
        }
      }

      private sealed class ScalarAggregateValue : AggregateValue
      {
        private CosmosElement value;
        private bool initialized;

        private ScalarAggregateValue()
        {
          this.value = null;
          this.initialized = false;
        }

        public override CosmosElement Result
        {
          get
          {
            if (!this.initialized)
            {
              throw new InvalidOperationException($"{nameof(ScalarAggregateValue)} is not yet initialized.");
            }

            return this.value;
          }
        }

        public static ScalarAggregateValue Create()
        {
          return new ScalarAggregateValue();
        }

        public override void AddValue(CosmosElement aggregateValue)
        {
          if (!this.initialized)
          {
            this.value = aggregateValue;
            this.initialized = true;
          }
        }
      }
    }
  }
}
