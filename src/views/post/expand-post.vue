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

            <!--<Col span="8">-->
                <!--<span class="expand-key">content: </span>-->
                <!--<span class="expand-value">{{ row.content }}</span>-->
            <!--</Col>-->
            <!--<Col span="8">-->
                <!--<span class="expand-key">Birthday: </span>-->
                <!--<span class="expand-value">{{ row.birthday }}</span>-->
            <!--</Col>-->
        </Row>
        <Row>
            <Col span="12">
                <span class="expand-key">content: </span>
                <span class="expand-value">{{ row.content }}</span>
            </Col>
            <!--<Col span="8">-->
                <!--<span class="expand-key">Favorite book: </span>-->
                <!--<span class="expand-value">《{{ row.book }}》</span>-->
            <!--</Col>-->
            <!--<Col span="8">-->
                <!--<span class="expand-key">Favorite movie: </span>-->
                <!--<span class="expand-value">{{ row.movie }}</span>-->
            <!--</Col>-->
            <!--<Col span="8">-->
                <!--<span class="expand-key">Favorite music: </span>-->
                <!--<span class="expand-value">{{ row.music }}</span>-->
            <!--</Col>-->
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
