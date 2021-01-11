<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadCourseImage } from '@/services/course'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: '',
      required: true
    }
  },
  mounted () {
    console.log(this.value)
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      editor.create()
      editor.txt.html(this.value)
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }
      editor.config.customUploadImg = async function (resultFiles: any, insertImgFn: any) {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        insertImgFn(data.data.name)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
