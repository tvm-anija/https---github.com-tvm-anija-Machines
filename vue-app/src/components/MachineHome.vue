<template>
<h2>List of Machines</h2>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <p v-else v-for="character in result.machines" :key="character.id">
  <a>  {{ character.name }}</a>
  </p>
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
                                    }
                                }

            `;
export default {
  name: 'App',
  setup () {
    const { result, loading, error } = useQuery(machines);

    return {
      result,
      loading, 
      error
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
</style>