<script lang="ts">
  import { onMount } from 'svelte'
  import { browser, dev, building, version } from '$app/environment'
  import { PUBLIC_API_KEY } from '$env/static/public'
  import { zoom } from '$lib/stores'
  import Map from './Map.svelte'

  let node:HTMLElement, center, type = 'hybrid'

  onMount(() => {
    center = new google.maps.LatLng({lat: 47.6677, lng: 19.0759}) // Szentendre
  });
</script>

<svelte:head>
  <script src="https://maps.googleapis.com/maps/api/js?key={PUBLIC_API_KEY}" referrerpolicy="no-referrer"></script>
</svelte:head>

{#if center}
<main>
  <code>
    lat: {center.lat().toFixed(5)}&nbsp;&nbsp;long: {center.lng().toFixed(5)}
    <!-- zoom: {$zoom} -->
  </code>

  <Map bind:center dir="n" />
  <Map bind:center dir="e" heading={90} />
  <Map bind:center dir="w" heading={270} />
  <Map bind:center dir="s" heading={180} />
</main>
{/if}

<style>
  main {
    flex-grow: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content 1fr 1fr;
    grid-template-areas: "h h" "n e" "w s";
    padding: var(--gap);
    gap: var(--gap);
  }
  code {
    text-align: center;
    grid-area: h;
  }
</style>
