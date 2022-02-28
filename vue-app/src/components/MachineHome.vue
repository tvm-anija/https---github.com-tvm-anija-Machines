<template>
   <div class="list-group" v-if="showPlaces == false">
       <h2>List of Machines</h2>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <p v-else v-for="machine in result.machines" :key="machine.id">
  <a @click="clickedPlace(machine,result.SensorData)" target="#">  {{ machine.name }}</a>
  </p>
    </div>
      <div v-else>
          <h2> {{selectedPlace.name}} - Sensors</h2>
          <p v-for="sensor in selectedPlace.sensors" :key="sensor.id">
              {{ sensor.name }}
          </p>

            <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in filteredSensorData" :key="data.id">
        <td> {{ data.date }}</td>
        <td> {{ data.value }}</td>
      </tr>
    </tbody>
  </table>

  <input type="text" placeholder="Filter by date" v-model="filter" />
           </div>
  <div></div>
</template>
<script>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const machines = gql`
                query  {
                        machines {
                                    id
                                    name
                                    sensors {
                                             id
                                             name
                                            }
                              }
                              SensorData {
                                            id
                                            value
                                            date
                                            machine
                                        }
                    }

            `;
export default {
  name: 'App',
    data: () => ({
        filter:"",
    showPlaces: false,
    selectedPlace: {},
    sensorData:{},
    filteredSensorData:{}
  }),
  setup () {

    const { result, loading, error } = useQuery(machines);

    return {
      result,
      loading, 
      error
    }
  },
   variables: {
       filter:"",
         showPlaces: false,
        selectedPlace: {},
        sensorData:{},
        filteredSensorData:{}
      },
  methods:{
       clickedPlace (selectedItem,sensorData) {
        this.selectedPlace = selectedItem,
        this.showPlaces = true,
        this.sensorData=sensorData.filter( data => {
             return data.machine==selectedItem.id;
      }),
      this.filteredSensorData=this.sensorData,
        this.$mount();
     }
  },
     watch: {
        'filter': function(val){
           this.filteredSensorData= this.sensorData.filter(data=>{
               return data.date.includes(val);
           })
      }
    }
}
</script>
<style>
a{
    color: blue;
    text-decoration: underline;
    cursor: pointer;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #dddddd;
}

input[type=text], select {
      width: 50%;
    margin-left: auto;
    margin-right: auto;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 25px;
}
</style>