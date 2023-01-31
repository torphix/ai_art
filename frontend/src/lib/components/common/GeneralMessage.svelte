<script type="ts">
	export let message: string;
    export let colorCode: string;
</script>


<div class="alert alert-{colorCode} shadow-lg">
    <div>
      <span>{message}</span>
    </div>
  </div>