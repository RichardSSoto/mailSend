<template>
  <div>
    <div
      v-for="(question,index) in questions"
      :key="index"
      :index="index"
      class="flex row justify-between items-center wrapper-question"
    >
      <q-card>
        <div class="full-width items-start flex q-mb-md">
          {{question.question}}
        </div>
        <div class="col-2 flex justify-center">
            <q-radio 
              dense 
              label="A. Totalmente de acuerdo" 
              :name="'question-' + index + '-1'" 
              v-model="question.value_column_a" 
              val="5" 
            />
            <q-radio 
              dense 
              label="B. De acuerdo" 
              :name="'question-' + index + '-1'" 
              v-model="question.value_column_a" 
              val="4" 
            />
            <q-radio 
              dense 
              label="C. En parte de acuerdo, en parte en desacuerdo" 
              :name="'question-' + index + '-1'" 
              v-model="question.value_column_a" 
              val="3" 
            />
            <q-radio 
              dense 
              label="D. en desacuerdo" 
              :name="'question-' + index + '-1'" 
              v-model="question.value_column_a" 
              val="2" 
            />
            <q-radio 
              dense 
              label="E. Totalmente en desacuerdo" 
              :name="'question-' + index + '-1'" 
              v-model="question.value_column_a"
              val="1"
            />
        </div>
        <!-- <div class="col-2 flex justify-center">
            <q-radio 
              dense 
              label="A. Totalmente de acuerdo" 
              :name="'question-' + index + '-2'" 
              v-model="question.value_column_b" 
              val="5" 
              color="cyan" 
            />
            <q-radio 
              dense 
              label="B. De acuerdo" 
              :name="'question-' + index + '-2'" 
              v-model="question.value_column_b" 
              val="4" 
              color="cyan"
            />
            <q-radio 
              dense
              label="C. En parte de acuerdo, en parte en desacuerdo" 
              :name="'question-' + index + '-2'" 
              v-model="question.value_column_b" 
              val="3" 
              color="cyan"
            />
            <q-radio 
              dense 
              label="D. en desacuerdo" 
              :name="'question-' + index + '-2'" 
              v-model="question.value_column_b" 
              val="2" 
              color="cyan"
            />
            <q-radio 
              dense 
              label="E. Totalmente en desacuerdo" 
              :name="'question-' + index + '-2'" 
              v-model="question.value_column_b" 
              val="1" 
              color="cyan"
            />
        </div> -->
      </q-card>
    </div>
  </div>
</template>

<script>

import questions from "../Questions/questions.json";

export default {
  data() {
    return {
      questions: questions
    };
  },
  methods: {
    savePhoto() {
      this.downloadVisualReport();
    },
  }
};
</script>

<style lang="scss">
.wrapper-question {
  height: 40px;
}
</style>