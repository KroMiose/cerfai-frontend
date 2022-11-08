<!-- Qzhihe 2022-10-26 -->
<template>
  <div class="logPanel">
    <div class="row">
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="pageIndex" :page-sizes="[20, 50, 100]" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <div class="row">
        <el-input v-model="search_keyword" placeholder="日志id"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getLogs"></el-button>
        <el-button type="danger" plain icon="el-icon-close" @click="clear"></el-button>
        <!-- <tableFilter class="tableFilter" :showPanel="showPanel"></tableFilter> -->
      </div>
    </div>

    <div class="table-view">
      <!-- 日志列表 -->
      <el-table
        :data="logList"
        :default-sort="{ prop: 'update_time', order: 'descending' }"
        @row-click="selectLog"
        style="width: 100%"
        height="99%"
        fit
        border
      >
        <el-table-column prop="update_time" label="上次更新时间" min-width="110" sortable="custom">
          <template v-slot="scope">
              <span v-text="GMTToStr(logList[scope.$index].update_time)"></span>
          </template>
        </el-table-column>

        <el-table-column prop="ip" label="执行者IP地址" min-width="80" sortable="custom">
          <template v-slot="scope">
            <span class="s_name_dsp">{{ logList[scope.$index].ip }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="t_name" label="词条ID" min-width="80" sortable="custom">
          <template v-slot="scope">
              <span class="s_name_dsp">{{ logList[scope.$index].ct_id }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="词条名" min-width="80" sortable="custom"></el-table-column>

        <el-table-column prop="t_name" label="词条译名" min-width="80" sortable="custom">
          <template v-slot="scope">
              <span class="s_name_dsp">{{ logList[scope.$index].t_name }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="c_id" label="分类" min-width="80" sortable="custom">
          <template v-slot="scope">
            <span v-text="get_category_name(logList[scope.$index].c_id)"></span>
          </template>
        </el-table-column>

        <el-table-column prop="update_times" label="更新次数" min-width="80" sortable="custom"></el-table-column>

        <el-table-column label="操作" width="90">
          <template>
            <el-button size="mini" type="primary" style="margin: 0 1px" @click="drawer=true" plain>详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 日志详情页 -->
    <el-drawer title="日志详情" :withHeader="false" :visible.sync="drawer" size="800px" direction="rtl">
      <div class="drawer">
        <el-descriptions class="margin-top" title="日志详情" :column="2" size="small" border>
          <template slot="extra">
            <el-button type="danger" size="small" @click="rollBackLog(log_selected.id)">撤销变动</el-button>
          </template>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i><span>词条名</span>
            </template>
            <span>{{ log_selected.name }}</span>
          </el-descriptions-item>

          <el-descriptions-item span="1">
            <template slot="label">
              <i class="el-icon-s-comment"></i><span>词条译名</span>
            </template>
            <el-input placeholder="请输入词条译名" v-model="log_selected.t_name"></el-input>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label"><i class="el-icon-s-custom"></i><span>是否NSFW</span></template>
            <el-switch
              style="display: block"
              v-model="log_selected.is_nsfw"
              active-color="#ff8989"
              inactive-color="#13ce66"
              active-text="NSFW"
              inactive-text="正常"
            >
            </el-switch>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-key"></i><span>是否锁定</span>
            </template>
            <el-switch style="display: block" v-model="log_selected.is_locked" active-color="#ffd949"
              inactive-color="#13ce66" active-text="锁定词条" inactive-text="解锁词条">
            </el-switch>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-headset"></i><span>上次更新时间</span>
            </template>
            <span>{{ GMTToStr(log_selected.update_time) }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-star-off"></i><span>更新总次数</span>
            </template>
            <span>{{ log_selected.update_times }}</span>
          </el-descriptions-item>

          <el-descriptions-item span="2">
            <template slot="label">
              <i class="el-icon-s-comment"></i><span>词条分类</span>
            </template>
            <category-selector :value="log_selected.c_id" @change="(nv) => (log_selected.c_id = nv)"></category-selector>
          </el-descriptions-item>

          <el-descriptions-item span="2">
            <template slot="label">
              <i class="el-icon-s-comment"></i><span>词条说明</span>
            </template>
            <el-input type="textarea" :rows="6" placeholder="请输入词条说明" v-model="log_selected.desc"></el-input>
          </el-descriptions-item>

          <el-descriptions-item span="2">
            <template slot="label">
              <i class="el-icon-s-comment"></i><span>词条备注</span>
            </template>
            <el-input type="textarea" :rows="6" placeholder="请输入词条备注" v-model="log_selected.remarks"></el-input>
          </el-descriptions-item>

          <el-descriptions-item span="2">
            <template slot="label">
              <i class="el-icon-s-comment"></i><span>贡献者</span>
            </template>
            <el-input type="textarea" :rows="6" placeholder="请输入词条备注" v-model="log_selected.contributor"></el-input>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// import tableFilter from '@/components/tableFilter.vue'
import categorySelector from '@/components/categorySelector.vue'

export default {
  name: 'logPanel',
  components: { categorySelector },
  data () {
    return {
      // 关于分页
      pageIndex: 1,
      pageSize: 20,
      total: 0,
      // 关于搜索
      search_keyword: '',
      // 关于日志
      logList: [],
      // 关于标签
      categories: [],
      // 关于详情页
      drawer: false,
      log_selected: {}
    }
  },
  methods: {
    // 处理分页
    handleSizeChange (val) {
      this.pageSize = val
      this.getLogs()
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.getLogs()
    },
    // 处理搜索
    clear () {
      this.search_keyword = ''
      this.getLogs()
    },
    // 处理日志
    getLogs () {
      this.$http({
        method: 'POST',
        url: `${this.$store.state.serverhost}/admin/get_record`,
        data: {
          keyword: this.search_keyword,
          page: this.pageIndex,
          pageSize: this.pageSize,
          token: this.$store.state.token
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.logList = res.data.data.data
          this.total = res.data.data.total

          this.$message({
            type: 'success',
            message: '获取日志列表成功',
            duration: 2000
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg,
            duration: 2000
          })
        }
      })
    },
    rollBackLog (logId) {
      this.$http({
        method: 'POST',
        url: `${this.$store.state.serverhost}/admin/back_to_record`,
        data: {
          record_id: logId,
          token: this.$store.state.token
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '获取日志列表成功',
            duration: 2000
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg,
            duration: 2000
          })
        }
      })
    },
    // TODO 另设按钮和选中框进行批量回滚
    rollBackLogs () {

    },
    // 格式化时间
    // Qzhihe 该方法能否使用 day.js 实现
    GMTToStr (date) {
      if (date) {
        date = new Date(date.slice(0, -4))
        const y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        let d = date.getDate()
        d = d < 10 ? '0' + d : d
        let h = date.getHours()
        h = h < 10 ? '0' + h : h
        let minute = date.getMinutes()
        minute = minute < 10 ? '0' + minute : minute
        let second = date.getSeconds()
        second = second < 10 ? '0' + second : second
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      } else {
        return ''
      }
    },
    // 获取分类列表
    get_categories () {
      const _this = this
      // 获取categories列表
      this.$http({
        method: 'GET',
        url: `${_this.$store.state.serverhost}/get_categories`
      })
        .then((res) => {
          // console.log(res.data)
          // _this.categories = res.data.data
          _this.up_cnt = res.data.up_cnt
          // _this.categories.forEach((v, i) => {
          //   _this.categories[i].value = v.name
          // })
          const cd = res.data.contributor
          const nlist = []
          for (const key in cd) {
            // console.log(key,obj[key])
            nlist.push({ name: key, cnt: cd[key] })
          }
          _this.contributor_toplist = nlist
          _this.get_categories_full()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取完整的分类列表
    // TODO:该函数为过渡方案，等待替换
    get_categories_full () {
      const _this = this
      // 获取categories列表
      this.$http({
        method: 'GET',
        url: `${_this.$store.state.serverhost}/open/get_full_categories`
      })
        .then((res) => {
          // console.log(res.data)
          _this.categories = res.data.data
          _this.$store.commit('setCategories', _this.categories)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取分类名
    get_category_name (id) {
      let res = '未知分类'
      this.categories.forEach((v) => {
        if (v.id === id) {
          res = v.name
        }
      })
      return res
    },
    // 详情页功能
    selectLog (row) {
      this.log_selected = JSON.parse(JSON.stringify(row))
    },
    // TODO 修改日志内容，等待后端接口
    submitUpdate () {

    }
  },
  mounted () {
    this.getLogs()
  }
}
</script>

<style lang="scss" scoped>
.logPanel {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .row {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;

    .pagination {
      box-sizing: border-box;
    }

    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      max-width: 500px;

      .el-button {
        margin-left: 4px;
      }

      .tableFilter {
        margin-left: 4px;
      }
    }
  }
  .table-view {
    width: 99%;
    flex: 1;
    overflow: hidden;

    .s_name_dsp {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}
</style>
