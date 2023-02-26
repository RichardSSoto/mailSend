<template>
  <div>
    <div
      v-for="(question,index) in questions"
      :key="index"
      :index="index"
    >
      <p><b>{{question.question}}</b></p>
      <q-input
        v-model="question.value"
        filled
        type="textarea"
      />
    </div>
  </div>
</template>

<script>

const company = 'Marco Peruana'

export default {
  data() {
    return {
      // company: 'Marco Peruana',
      questions: [
        {
          id: 1,
          question: `¿Consideras que ${company} es un buen lugar para trabajar?`,
          value: '',
          category: 'lorem'
        },
        {
          id: 2,
          question: `¿Hay algo que podríamos hacer para mejorar el clima laboral en la Empresa?`,
          value: '',
          category: 'lorem'
        }
      ]
    }
  }
}
</script>