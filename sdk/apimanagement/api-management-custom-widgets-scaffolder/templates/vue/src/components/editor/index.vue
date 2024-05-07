<style lang="scss" src="../../styles/editor.scss"></style>

<template>
  <div class="form">
    <div class="form-group">
      <label for="actionUrl" class="form-label">Label 1</label>
      <input id="actionUrl" type="text" class="form-control" v-model="label1" :placeholder="valuesDefault.label1" />
    </div>
    <div class="form-group">
      <label for="actionUrl" class="form-label">Label 2</label>
      <input id="actionUrl" type="text" class="form-control" v-model="label2" :placeholder="valuesDefault.label2" />
    </div>
    <div class="form-group">
      <label for="actionUrl" class="form-label">Placeholder</label>
      <input id="actionUrl" type="text" class="form-control" v-model="placeholder"
             :placeholder="valuesDefault.placeholder" />
    </div>
    <div class="form-group">
      <label for="actionUrl" class="form-label">Action URL</label>
      <input id="actionUrl" type="text" class="form-control" v-model="actionUrl"
             :placeholder="valuesDefault.actionUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import {buildOnChange, getEditorValues} from "@azure/api-management-custom-widgets-tools"
import {Values, valuesDefault} from "../../values"

export default {
  data() {
    return {
      label1: "Email",
      label2: "Message",
      placeholder: "Write your message here",
      actionUrl: "https://httpbin.org/post",
      valuesDefault,
    }
  },

  async mounted(): Promise<void> {
    this.onChange = buildOnChange<Values>()

    const editorData = getEditorValues<Values>()

    this.label1 = editorData.label1
    this.label2 = editorData.label2
    this.placeholder = editorData.placeholder
    this.actionUrl = editorData.actionUrl
  },

  watch: {
    label1(newValue: string): void {
      this.onChange({label1: newValue})
    },
    label2(newValue: string): void {
      this.onChange({label2: newValue})
    },
    placeholder(newValue: string): void {
      this.onChange({placeholder: newValue})
    },
    actionUrl(newValue: string): void {
      this.onChange({actionUrl: newValue})
    },
  },
}
</script>
