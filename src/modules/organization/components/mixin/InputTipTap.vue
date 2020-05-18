<template>
  <EditorContent
    :editor="editor"
    ref="editor"
    @click.native="setFocusEditor"
    class="OrganizationInputTipTap"
  />
</template>

<script>
"use strict";

import { Editor, EditorContent } from "tiptap";

export default {
  name: "OrganizationInputTipTap",
  components: {
    EditorContent
  },
  data() {
    return {
      hasFocus: false,
      editor: ""
    };
  },
  methods: {
    setFocusEditor() {
      this.editor.focus();
    },
    getContent() {
      if (this.$refs.editor.$el.textContent === "") {
        return "";
      }
      return this.editor.getHTML();
    }
  },
  mounted() {
    this.editor = new Editor({
      content: "",
      onFocus: () => {
        this.hasFocus = true;
      },
      onBlur: () => {
        if (this.$refs.editor.$el.textContent === "") {
          this.hasFocus = false;
        }
      },
      extensions: []
    });
  },
  beforeDestroy() {
    if (this.editor) this.editor.destroy();
  }
};
</script>

<style lang="scss">
.OrganizationInputTipTap {
  cursor: text;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  max-width: 100%;
  width: 100%;
  padding: 0.5rem;
  min-height: 100px;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  margin-top: 0.5rem;
}
</style>
