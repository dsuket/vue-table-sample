<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in tableHeaders" :key="header.column + header.fieldId">
          <div class="table-header">
            {{header.name}}
            <div class="sort-icons" @click="sort(header)" :class="[getSortClass(header)]">
              <span class="sort-icon sort-icon-asc">▲</span>
              <span class="sort-icon sort-icon-desc">▼</span>
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(personData, index) in tableDatas" :key="index">
        <td >{{personData.createdAt}}</td>
        <td >{{personData.id}}</td>
        <td >{{personData.name}}</td>
        <td >{{personData.email}}</td>
        <td v-for="(cheader, idx) in customHeaders" :key="cheader.fieldId">
          {{getCustomFieldValue(personData, idx)}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface HeaderColumn {
  column?: string;
  fieldId?: string;
  name: string;
  sortDirection: SortDirection;
}

interface DefaultHeaderColumn extends HeaderColumn {
  column: string;
}
interface CustomHeaderColumn extends HeaderColumn {
  fieldId: string;
}

interface PersonData {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  [key: string]: string
}

type SortDirection = 'asc' | 'desc' | 'none';

@Component({})
export default class TableSample extends Vue {

  // デフォルトのヘッダ情報
  private defaultHeaders: DefaultHeaderColumn[] = [
    {
      column: 'createdAt',
      name: '作成日時',
      sortDirection: 'desc'
    },
    {
      column: 'id',
      name: 'ID',
      sortDirection: 'none'
    },
    {
      column: 'name',
      name: '名前',
      sortDirection: 'none'
    },
    {
      column: 'email',
      name: 'メールアドレス',
      sortDirection: 'none'
    },
  ];
  private tableHeaders: HeaderColumn[] = [];
  private tableDatas: PersonData[] = [];
  private customHeaders: CustomHeaderColumn[] = [];

  constructor() {
    super();
    this.loadData()
  }

  getSortClass(headerColumn: HeaderColumn): string {
    switch (headerColumn.sortDirection) {
      case 'asc':
        return 'sort-asc'
      case 'desc':
        return 'sort-desc'
      default:
        return ''
    }
  }

  sort(headerColumn: HeaderColumn): void {
    this.updateSortDirection(headerColumn);
    this.sortByApi(headerColumn);
  }

  getCustomFieldValue(personData: PersonData, index: number): string {
    const key = `customField${index + 1}`;
    return personData[key];
  }

  private updateSortDirection(headerColumn: HeaderColumn): void {
    let newDirection: SortDirection = 'none';
    switch (headerColumn.sortDirection) {
      case 'asc':
        newDirection = 'desc'
        break;
      case 'desc':
        newDirection = 'asc'
        break;
      default:
        newDirection = 'desc'
    }
    // 既に選択されている物を一回リセット
    for (const tableHeader of this.tableHeaders) {
      tableHeader.sortDirection = 'none';
    }
    headerColumn.sortDirection = newDirection;
  }

  /**
   * APIへ投げてソート
   * ダミーで内部でソート
   */
  private async sortByApi(headerColumn: HeaderColumn): Promise<void> {
    const data = await this.loadPersonData();
    const sortOrder = headerColumn.sortDirection === 'asc' ? 1 : -1;
    const sortKey = headerColumn.column ? headerColumn.column : `customField${headerColumn.fieldId}`;
    this.tableDatas = data.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return -1 * sortOrder
      } else if (a[sortKey] > b[sortKey]) {
        return 1 * sortOrder;
      }
      return 0;
    })

  }

  private async loadData(): Promise<void> {
    this.customHeaders = await this.loadCustomHeaders();
    this.tableHeaders = [...this.defaultHeaders, ...this.customHeaders];
    this.tableDatas = await this.loadPersonData();
  }

  /**
   * カスタムヘッダーをロードする
   * （ダミーで固定値だが、実際はAPIなどから取得）
   */
  private async loadCustomHeaders(): Promise<CustomHeaderColumn[]> {
    return Array.from([
      {
        fieldId: '1',
        name: '生年月日',
        sortDirection: 'none'
      },
      {
        fieldId: '2',
        name: '住所',
        sortDirection: 'none'
      },
    ]);
  }

  /**
   * データをロードする
   * （ダミーで固定値だが、実際はAPIなどから取得）
   */
  private async loadPersonData(): Promise<PersonData[]> {
    return Array.from([
      {
        id: '4', 
        createdAt: '2021-04-04', 
        name: '佐藤',
        email: 'sato@example.com',
        customField1: '2001/04/01',
        customField2: '千葉'
      },
      {
        id: '3', 
        createdAt: '2021-04-03', 
        name: '加藤',
        email: 'kato@example.com',
        customField1: '2001/03/01',
        customField2: '神奈川'
      },
      {
        id: '2', 
        createdAt: '2021-04-02', 
        name: '鈴木',
        email: 'suzuki@example.com',
        customField1: '2001/02/01',
        customField2: '北海道'
      },
      {
        id: '1', 
        createdAt: '2021-04-01', 
        name: '田中',
        email: 'tanaka@example.com',
        customField1: '2001/01/01',
        customField2: '東京'
      },
    ]);
  }
}

</script>

<style lang="scss">
table {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    border: 1px solid #ccc;
}
.table-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.sort-icons {
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  cursor: pointer;
  color: #999;
  &.sort-asc, &.sort-desc {
    color: #000;
  }
  &.sort-asc {
    .sort-icon-desc {
      display: none;
    }
  }
  &.sort-desc {
    .sort-icon-asc {
      display: none;
    }
  }
}
.sort-icon {
  font-size: 6px;
  line-height: 10px;
}
</style>