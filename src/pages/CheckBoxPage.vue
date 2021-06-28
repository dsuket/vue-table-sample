<template>
  <div>
    <h1>CheckBox Sample</h1>
    <ul class="checkbox-list">
      <li v-for="item in this.items" :key="item.id">
        <InputCheckBoxBasic v-model="item.checked" :id="item.id">{{
          item.name
        }}</InputCheckBoxBasic>
      </li>
    </ul>
    <div>
      Checked:
      <span
        class="checked-item"
        v-for="item in this.checkedItems"
        :key="item.id"
        >{{ item.name }}</span
      >
    </div>
    <a href="#" @click="reset()">リセット</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InputCheckBoxBasic from "@/components/InputCheckBoxBasic.vue";

interface Item {
  id: string;
  name: string;
  checked: boolean;
}

@Component({
  components: {
    InputCheckBoxBasic,
  },
})
export default class CheckBoxPage extends Vue {
  items: Item[] = [
    {
      id: "1",
      name: "Item1",
      checked: true,
    },
    {
      id: "2",
      name: "Item2",
      checked: false,
    },
    {
      id: "3",
      name: "Item3",
      checked: false,
    },
  ];

  get checkedItems(): Item[] {
    return this.items.filter((item) => item.checked);
  }

  constructor() {
    super();
  }

  reset(): void {
    for (const item of this.items) {
      item.checked = false;
    }
  }
}
</script>

<style scoped lang="scss">
.checkbox-list {
  margin: 0;
  padding: 0;
  display: flex;
  li {
    list-style: none;
    margin: 0;
    padding: 0 10px;
  }
}
.checked-item {
  margin: 0 4px;
}
</style>
