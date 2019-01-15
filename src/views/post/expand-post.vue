<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="12">
                <Card style="width:320px">
                    <div style="word-wrap:break-word; ">
                        <!--<span class="expand-key">original: </span>-->
                        <span class="expand-value" >{{ row.original }}</span>
                    </div>
                </Card>

            </Col>
            <Col span="12">
                <Card style="width:320px">
                    <div style="word-wrap:break-word; ">
                        <!--<span class="expand-key">content: </span>-->
                        <span class="expand-value" v-html="row.content"></span>
                        <!--<h3>A high quality UI Toolkit based on Vue.js</h3>-->
                    </div>
                </Card>

            </Col>
        </Row>

    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
