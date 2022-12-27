<template>
   <div>
      home2
      {{ hello }}
      <div>
          <p>
              <h3>hello</h3> {{hello}}
          </p>
      </div>
      <div>
          <h2>article list</h2>
          <ul>
              <li v-for="(item) in artis">
                  {{item.id}} {{item.title}} 
                  <img v-if="item.logo" :src="item.logo" />
                  <div>

                      {{ item.content }}
                  </div>
              </li>
          </ul>

      </div>
   </div>
</template>
<script>
import gql from "graphql-tag";
export default {
   data(){
      return {
         hello: "",
         artis: []
      }
   },
   apollo: {
      hello: gql`
         query {
            hello
         }
      `,
      artis: gql`
         query {
            artis{
                id
                title
                content
                logo
            }
         }
      `,
   },
};
</script>
