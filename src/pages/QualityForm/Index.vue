<template>
  <q-page
    style="margin: 32px 0px"
    class="flex column items-center justify-center"
  >
    <div>
      <h3>Encuesta de clima laboral 2022</h3>
      <p>
        Estamos interesados en conocer tu opinión respecto al clima y cultura en la organización. 
        Tu participación es muy importante para este proyecto - por favor lee con detenimiento las siguientes instrucciones 
      </p>
    </div>
    <div>
      <h5>I. Instrucciones</h5>
      <p>
        Contesta la encuesta con total honestidad y sinceridad de manera tal que los resultados reflejen real y objetivamente el ambiente  laboral en la empresa. 
      </p>
      <p>
        Esta encuesta podrá ser llenada por única vez en un mismo dispositivo. Una vez comencemos, debemos completar todas las preguntas sin dejar espacios sin contestar.
      </p>
    </div>
    <div>
      <h5>II. Garantía de Anonimato y Confidencialidad</h5>
      <p>
        Marco Peruana garantiza a los trabajadores que el proceso de encuestas se llevan a 
        cabo de manera transparente, anónima y que los  resultados se trataran con absoluta confidencialida 
      </p>
      <p>
        Lea cada pregunta y elija la ópcion que corresponda a su respuesta.
      </p>
    </div>
    <div>
      <h5>III. Selección de Datos Demográficos</h5>
      <p>
        Por favor responda las siguientes preguntas seleccionando la alternativa correspondiente
      </p>
      <people-data></people-data>
    </div>
    <div>
      <h5>IV. Encuesta de satisfacción</h5>
      <div>
        <p>
          La encuesta evalúa dos aspectos:
        </p>
        <p>
        </p>
          <b>Columna A</b> Qué opina usted de su área y/o jefatura directa.
        <p>
          <b>Columna B</b> Qué opina usted de su organización como un todo y/o de quienes la dirigen.
        </p>
      </div>
      <div>
        <p>
          <b>Escala de respuestas</b>
        </p>
        <span>1. Nunca</span>
        <span>2. Poco</span>
        <span>3. Regular o Algo</span>
        <span>4. Mucho</span>
        <span>5. Siempre</span>
      </div>
      <questions></questions>
    </div>
    <div>
      <h5>V. Comentarios</h5>
      <div>
        <p>
          Por favor llena esta sección , Al igual que en la sección anterior, sus comentarios son anónimos.
        </p>
      </div>
      <open-questions></open-questions>
    </div>
  </q-page>
</template>

<script>

import PeopleData from "components/QualityForm/PeopleData.vue";
import Questions from "components/QualityForm/Questions.vue";
import OpenQuestions from "components/QualityForm/OpenQuestions.vue";

export default {
  data() {
    return {
      razon_social: "mp",
      output: null,
    };
  },
  components: {
    "people-data": PeopleData,
    "questions": Questions,
    'open-questions': OpenQuestions
  },
  methods: {
    savePhoto() {
      this.downloadVisualReport();
    },
  }
};
</script>

<style>
.container {
  width: 595px;
  height: auto;
}
</style>