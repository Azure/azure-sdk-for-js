<style src="../../styles/app.scss"></style>

<template>
  <form :action="actionUrl">
    <div class="form-group">
      <label for="email" class="form-label">{{ label1 }}</label>
      <input id="email" type="email" class="form-control" name="email" placeholder="example@contoso.com" />
    </div>
    <div class="form-group">
      <label for="email" class="form-label">{{ label2 }}</label>
      <textarea id="message" class="form-control" name="message" placeholder="Write your message here."></textarea>
    </div>
    <button type="submit" class="button button-primary">{{ label3 }}</button>
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
      label3: null,
      actionUrl: null,
    }
  },

  async mounted(): Promise<void> {
    const editorData = getEditorData(valuesDefault)
    this.label1 = editorData.values.label1
    this.label2 = editorData.values.label2
    this.label3 = editorData.values.label3
    this.actionUrl = editorData.values.actionUrl
  },
}
</script>
