<template>
    <nav>
        <ul class="pagination justify-content-center" style="margin-bottom: 0">
            <li class="input-group" style="width:80px">
                <input
                    v-model.number="goto"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Go to"
                    class="form-control"
                    style="border-radius: 4px 0px 0px 4px !important"
                    @keyup.esc="goto = 1"
                />
            </li>
            <li class="page-item" :class="{ disabled: start <= 0 && idx <= start }">
                <a class="page-link" href="#" @click="switchPage(idx - 1)">&laquo;</a>
            </li>
            <!-- Note: v-for in number gives 1 to number inclusive -->
            <li
                v-for="index in length"
                :key="index"
                class="page-item"
                :class="{ active: idx === index + start - 1 }"
            >
                <a class="page-link" href="#" @click="switchPage(index + start - 1)">
                    {{ index + start }}
                </a>
            </li>
            <li class="page-item" :class="{ disabled: idx >= scheduleLength - 1 }">
                <a class="page-link" href="#" @click="switchPage(idx + 1)">&raquo;</a>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" src="./Pagination.ts"></script>
