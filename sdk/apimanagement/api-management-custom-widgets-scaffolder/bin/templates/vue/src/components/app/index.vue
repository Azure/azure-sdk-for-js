<style src="../../styles/app.scss"></style>

<template>
  <form :action="actionUrl" class="flex-columns-container height-fill">
    <div class="form-group">
      <label for="email" class="form-label">{{ label1 }}</label>
      <input id="email" type="email" class="form-control" name="email" placeholder="example@contoso.com" />
    </div>
    <div class="form-group height-fill flex-columns-container">
      <label for="message" class="form-label">{{ label2 }}</label>
      <textarea id="message" class="form-control flex-grow" name="message" :placeholder="placeholder"></textarea>
    </div>
    <div class="form-group">
      <button type="submit" class="button button-primary">Submit</button>
    </div>
  </form>
</template>

<script lang="ts">
import {getEditorData} from "@azure/api-management-custom-widgets-tools"
import {valuesDefault} from "../../values"

export default {
  data: () => {
    return {
      label1: null,
      label2: null,
      placeholder: null,
      actionUrl: null,
    }
  },

  async mounted(): Promise<void> {
    const editorData = getEditorData(valuesDefault)
    this.label1 = editorData.values.label1
    this.label2 = editorData.values.label2
    this.placeholder = editorData.values.placeholder
    this.actionUrl = editorData.values.actionUrl
  },
}
</script>
