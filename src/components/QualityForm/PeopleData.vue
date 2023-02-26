<template>
  <div>
    <q-form @submit="onSubmit" class="q-gutter-md">

      <div>
        <h5>
          A. Grupo Ocupacional
        </h5>
        <div>
          <div class="row flex items-center">
            Técnicos
            <q-radio name="grupo_ocupacional" v-model="grupo_ocupacional" val="1" />
          </div>
          <div class="row flex items-center">
            Asistentes
            <q-radio name="grupo_ocupacional" v-model="grupo_ocupacional" val="2" />
          </div>
          <div class="row flex items-center">
            Analistas
            <q-radio name="grupo_ocupacional" v-model="grupo_ocupacional" val="3" />
          </div>
          <div class="row flex items-center">
            Representantes
            <q-radio name="grupo_ocupacional" v-model="grupo_ocupacional" val="4" />
          </div>
          <div class="row flex items-center">
            Coordinadores
            <q-radio name="grupo_ocupacional" v-model="grupo_ocupacional" val="5" />
          </div>
          <div class="row flex items-center">
            Administradores
            <q-radio name="grupo_ocupacional" v-model="grupo_ocupacional" val="6" />
          </div>
          <div class="row flex items-center">
            Gerentes
            <q-radio name="grupo_ocupacional" v-model="grupo_ocupacional" val="7" />
          </div>
        </div>
      </div>

      <div>
        <h5>
          B. Sede
        </h5>
        <q-select outlined v-model="sede" :options="sede_options" :dense="true" :options-dense="true"/>
      </div>

      <div>
        <h5>
          C. Sexo
        </h5>
        <div>
          <div class="row flex items-center">
            Masculino
            <q-radio name="sexo" v-model="sexo" val="1" />
          </div>
          <div class="row flex items-center">
            Femenino
            <q-radio name="sexo" v-model="sexo" val="2" />
          </div>
        </div>
      </div>

      <div>
        <h5>
          D. Edad
        </h5>
        <div>
          <q-input
            v-model.number="edad"
            type="number"
            filled
            style="max-width: 200px"
          />
        </div>
      </div>

      <div>
        <h5>
          E. Estado Civil
        </h5>
        <div>
          <div class="row flex items-center">
            Soltero (a)
            <q-radio name="civil_status" v-model="civil_status" val="1" />
          </div>
          <div class="row flex items-center">
            Casado (a)
            <q-radio name="civil_status" v-model="civil_status" val="2" />
          </div>
          <div class="row flex items-center">
            Divorciado (a)
            <q-radio name="civil_status" v-model="sexo" val="3" />
          </div>
          <div class="row flex items-center">
            Conviviente
            <q-radio name="civil_status" v-model="civil_status" val="4" />
          </div>
        </div>
      </div>

      <div>
        <h5>
          F. Número de Hijos
        </h5>
        <div>
          <q-select 
            filled 
            v-model="hijos" 
            :options="hijos_options"
            label="Nº de hijos" />
        </div>
      </div>

      <div>
        <h5>
          G. Áreas
        </h5>
        <q-select outlined v-model="area" :options="area_options" :dense="true" :options-dense="true"/>
      </div>

      <div>
        <h5>
          H. Tiempo de servicio
        </h5>
        <div>
          <div class="row flex items-center">
            0 - 6 meses
            <q-radio name="service_time" v-model="service_time" val="1" />
          </div>
          <div class="row flex items-center">
            6 meses - 1 año
            <q-radio name="service_time" v-model="service_time" val="2" />
          </div>
          <div class="row flex items-center">
            1 - 3 años
            <q-radio name="service_time" v-model="service_time" val="3" />
          </div>
          <div class="row flex items-center">
            3 - 5 años
            <q-radio name="service_time" v-model="service_time" val="4" />
          </div>
          <div class="row flex items-center">
            5 - 10 años
            <q-radio name="service_time" v-model="service_time" val="5" />
          </div>
          <div class="row flex items-center">
            10 años a más
            <q-radio name="service_time" v-model="service_time" val="6" />
          </div>
        </div>
      </div>

      <div>
        <h5>
          I. Grado de Instrucción
        </h5>
        <div>
          <div class="row flex items-center">
            Secundaria Completa
            <q-radio name="education_level" v-model="education_level" val="1" />
          </div>
          <div class="row flex items-center">
            Técnico Incompleto
            <q-radio name="education_level" v-model="education_level" val="2" />
          </div>
          <div class="row flex items-center">
            Técnico Completo
            <q-radio name="education_level" v-model="education_level" val="3" />
          </div>
          <div class="row flex items-center">
            Universitario Incompleto
            <q-radio name="education_level" v-model="education_level" val="4" />
          </div>
          <div class="row flex items-center">
            Universitario Completo
            <q-radio name="education_level" v-model="education_level" val="5" />
          </div>
          <div class="row flex items-center">
            Postgrado
            <q-radio name="education_level" v-model="education_level" val="6" />
          </div>
        </div>
      </div>

      <div>
        <q-btn label="Next" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      grupo_ocupacional: '1',
      sede: 'ANTAPACAY - AREQUIPA',
      sede_options: [
        'ANTAPACAY - AREQUIPA',
        'ANTAPACAY - PRESERVACION DE COMPONENTES',
        'APM TERMINALS - CALLAO',
        'BAMBAS - AREQUIPA',
        'COSAPI - ICA',
        'KMMP - PIURA',
        'LABORATORIO - TRUJILLO',
        'MISKI MAYO - PIURA',
        'PETROPERU - PIURA',
        'QUELLAVECO - MOQUEGUA',
        'RESEMIN - ATE',
        'SAN MARTIN - ICA',
        'SEDE - AREQUIPA',
        'SEDE - LIMA/CALLAO',
        'SEDE - CHIMBOTE',
        'SEDE - ILO',
        'SOUTHERN - ILO',
        'VOLCAN'
      ],
      area: 'ADMINISTRACIÓN',
      area_options: [
        'ADMINISTRACIÓN',
        'ALMACEN',
        'BACK OFFICE',
        'CALIDAD Y SEGURIDAD',
        'COMPRAS',
        'CONTABILIDAD',
        'FINANZAS',
        'GERENCIA',
        'GERENCIA DE LUBRICACION',
        'GERENCIA HIDRAULICA',
        'HIDRAULICA TERRESTRE',
        'INGENIERÍA',
        'LUBRICACION INDUSTRIAL',
        'LUBRICACION MINERIA',
        'MANGUERAS Y CONEXIONES',
        'MONITOREO DE CONDICION',
        'RRHH',
        'SISTEMAS',
        'SISTEMAS DE LUBRICACION',
        'VENTA ASTEC',
        'VENTA MONITOREO DE CONDICION',
        'VENTAS COMERCIAL',
        'VENTAS HERRAMIENTAS HIDRAULICAS',
        'VENTAS HIDRAULICA MOVIL',
        'VENTAS HIDRAULICA NAVAL',
        'VENTAS LUBRICACION INDUSTRIAL',
        'VENTAS LUBRICACION MINERIA',
        'VENTAS MANGUERAS Y CONEXIONES',
        'VENTAS SISTEMAS DE LUBRICACION',
        'VENTAS TRANSMISION DE POTENCIA'
      ],
      sexo: '1',
      edad: 25,
      civil_status: '1',
      hijos: 1,
      service_time: '1',
      education_level: '1',
      submitResult: [],
      hijos_options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    onSubmit (evt) {
      const formData = new FormData(evt.target)
      const submitResult = []

      for (const [ name, value ] of formData.entries()) {
        submitResult.push({
          name,
          value
        })
      }

      this.submitResult = submitResult
    }
  }
}
</script>