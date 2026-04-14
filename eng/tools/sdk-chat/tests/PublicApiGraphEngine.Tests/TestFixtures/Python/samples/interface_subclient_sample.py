from sample_client import InterfaceClient


def main() -> None:
    client = InterfaceClient()
    recommendations = client.recommendations.list_recommendations()
    print(len(recommendations))


if __name__ == "__main__":
    main()
