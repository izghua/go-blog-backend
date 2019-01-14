<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="12">
                <span class="expand-key">tags: </span>
                <span class="expand-value">{{ row.tags }}</span>
            </Col>

        </Row>
        <Row>
            <Col span="12">
                <span class="expand-key">content: </span>
                <span class="expand-value">{{ row.content }}</span>
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
