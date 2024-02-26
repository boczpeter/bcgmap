<script lang="ts">
  import { onMount } from 'svelte'
  import { act, zoom, type } from '$lib/stores'

  export let center, heading:number = 0, dir:string

  let node:HTMLElement, map

  onMount(() => {
    map = new google.maps.Map(node, { zoom:$zoom, center, mapTypeId:$type, rotateControl:false, disableDefaultUI:heading,
      streetViewControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER },
      zoomControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM },
    });
    map.setHeading(heading)

    google.maps.event.addListener(map, 'dragend', () => {
      act.set(heading)
      center = map.getCenter()
    })
    google.maps.event.addListener(map, 'zoom_changed', () => {
      act.set(heading)
      zoom.set(map.getZoom())
      map.setHeading(heading)
    })
    google.maps.event.addListener(map, 'maptypeid_changed', () => {
      act.set(heading)
      type.set(map.getMapTypeId())
      map.setHeading(heading)
    })
  })

  $: if (map && center && $act !== heading) { // update other maps' positions when center changed
    map.setCenter(center)
  }

  zoom.subscribe(z => map && $act !== heading && map.setZoom(z))
  type.subscribe(t => map && $act !== heading && map.setMapTypeId(t))
</script>

<aside class={dir} bind:this={node}></aside>
<b class={dir}>{dir}</b>

<style>
  aside {
    outline: 1px solid #888;
  }
  .n { grid-area: n }
  .e { grid-area: e }
  .w { grid-area: w }
  .s { grid-area: s }

  /* north-south-east-west markers */
  b {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    width : 1.5em;
    height: 1.5em;
    color: #666;
    background: #fffa;
    /* outline: var(--gap) solid var(--bg); */
    z-index: 1;
    text-transform: uppercase;
    pointer-events: none;
  }
  b.n { place-self: end right; }
  b.e { place-self: end left; }
  b.w { place-self: start right; }
  b.s { place-self: start left; }
</style>
