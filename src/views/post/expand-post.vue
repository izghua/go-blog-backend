<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
    .markDiv>>>img {
        width:auto;
        height:auto;
        max-width:100%;
        max-height:100%;
    }
</style>
<template>
    <div>
        <Row class="expand-row" >
            <Col span="12">
                <Card style="width:320px">
                    <div style="word-wrap:break-word; ">
                        <!--<span class="expand-key">original: </span>-->
                        <span class="expand-value" >{{ row.original }}</span>
                    </div>
                </Card>

            </Col>
            <Col span="12">
                <Card >
                    <div style="word-wrap:break-word; ">
                        <span  class="expand-value markDiv" v-html="row.content"></span>
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
