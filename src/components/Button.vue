<script setup>
    const props = defineProps({
        variant: {
            type: String,
            default: "primary",
            required: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    });
</script>

<template>
    <button 
        :class="`btn btn-${variant}`" 
        :disabled="disabled"
    >
        <slot />
    </button>
</template>
