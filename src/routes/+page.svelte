<script lang="ts">
  import '$lib/style.css';
  import '$lib/maplibre_style.css';
  import '$lib/navbar_buttons.css';
  import AddOverlay from '$lib/AddOverlay.svelte';
  import InfoOverlay from '$lib/InfoOverlay.svelte';
  import Map from '$lib/Map.svelte';
  import NavBar from '$lib/NavBar.svelte';
  import { addOverlayVisible, infoOverlayVisible } from '../stores';
  import prs_sharing_image from '$lib/assets/prs_sharing_image.jpg';
  import DonatePopup from '$lib/DonatePopup.svelte';
</script>

<svelte:head>
  <title>People's River Stories</title>
  <meta
    name="description"
    content="People's River Stories is a community-driven map where visitors share river memories, oral histories, and reflections along America's waterways."
  />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://map.peoplesriverhistory.org/" />
  <meta property="og:title" content="People's River Stories" />
  <meta property="og:image" content={prs_sharing_image} />
  <meta
    property="og:description"
    content="People's River Stories is a community-driven map where visitors share river memories, oral histories, and reflections along America's waterways."
  />
  <meta property="og:site_name" content="People's River Stories" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="People's River Stories" />
  <meta
    name="twitter:description"
    content="People's River Stories is a community-driven map where visitors share river memories, oral histories, and reflections along America's waterways."
  />
  <meta name="twitter:image" content={prs_sharing_image} />
</svelte:head>

<NavBar></NavBar>
{#if $infoOverlayVisible}
  <InfoOverlay></InfoOverlay>
{/if}
{#if $addOverlayVisible}
  <AddOverlay></AddOverlay>
{/if}
<Map></Map>
<DonatePopup></DonatePopup>
