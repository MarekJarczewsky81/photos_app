<template>
  <form class="add-photo-form" @submit.prevent="handleSubmit">
    <h2>Add photo</h2>
    <Message v-if="isSuccess" severity="success" :closable="false">Success! Your photo has been submitted</Message>
    <Message v-if="isError" severity="error" :closable="false">Oops… something went wrong…</Message>
    <div class="form-content">
      <div class="form-fields">
        <!-- title -->
        <div class="p-field">
          <label>Title</label>
          <InputText v-model="form.title" />
        </div>

        <!-- author -->
        <div class="p-field">
          <label>Author</label>
          <InputText v-model="form.author" />
        </div>

        <!-- category -->
        <div class="p-field">
          <label>Category</label>
          <Dropdown
            v-model="form.category"
            :options="categories"
            optionLabel="name"
            placeholder="Select a Category"
          />
        </div>

        <!-- description -->
        <div class="p-field">
          <label>Description</label>
          <Textarea
            v-model="form.description"
            rows="5"
          />
        </div>

        <Button
          class="submit-button"
          type="submit"
          label="Add"
          icon="pi pi-plus"
        />
      </div>

      <div class="image-upload-container">
        <!-- image upload -->
        <ImageUpload @choose="onFileChosen" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import ImageUpload from '@/components/shared/ImageUpload.vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'

export default {
  name: 'AddPhotoForm',
  components: {
    ImageUpload,
    InputText,
    Dropdown,
    Textarea,
    Button,
    Message
  },
  computed: {
    ...mapState({
      categories: state => state.categories.categories
    })
  },
  data () {
    return {
      form: {
        title: '',
        author: '',
        description: '',
        category: '',
        file: null
      },
      isSuccess: false,
      isError: false
    }
  },
  mounted () {
    this.$store.dispatch('categories/fetchCategories')
  },
  methods: {
    async handleSubmit () {
      this.isSuccess = false
      this.isError = false

      try {
        const formData = new FormData()
        formData.append('title', this.form.title)
        formData.append('author', this.form.author)
        formData.append('description', this.form.description)
        formData.append('category', this.form.category)
        if (this.form.file) {
          formData.append('file', this.form.file)
        }
        await this.$store.dispatch('photos/addPhoto', formData)
        this.isSuccess = true
        this.resetForm()
      } catch (error) {
        console.error('Error submitting form:', error)
        this.isError = true
      }
    },
    onFileChosen (file) {
      this.form.file = file
    },
    resetForm () {
      this.form = {
        title: '',
        author: '',
        description: '',
        category: '',
        file: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-message {
  margin-bottom: 1rem;
}

.add-photo-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-content {
  display: flex;
  gap: 2rem;
}

.form-fields {
  flex: 1;
}

.image-upload-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.p-field {
  margin-bottom: 1rem;
}

.p-field label {
  display: block;
  margin-bottom: 0.5rem;
}

.submit-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 20px;
}

:deep(.p-inputtext),
:deep(.p-dropdown),
:deep(.p-textarea) {
  width: 100%;
}
</style>
