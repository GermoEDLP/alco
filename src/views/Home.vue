<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="documents.length > 0">
      {{documents}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { db } from '@/db';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      documents: [],
    }
  },
  created(){
    db.collection('user')
  .get()
  .then(querySnapshot => {
    this.documents = querySnapshot.docs.map(doc => doc.data())
    // do something with documents
  })
  }
}
</script>
