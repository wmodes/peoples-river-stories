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
  import { onDestroy, onMount } from 'svelte';

  const IDLE_INTERVAL_MS = 60 * 60 * 1000; // 60 minutes
  let idleTimer: ReturnType<typeof setTimeout> | null = null;

  function clearReloadTimer() {
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }

  function scheduleReload() {
    clearReloadTimer();
    idleTimer = setTimeout(() => {
      refreshMapData().then((success) => {
        if (!success) {
          scheduleReload();
        }
      });
    }, IDLE_INTERVAL_MS);
  }

  async function refreshMapData(): Promise<boolean> {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const timestamp = Date.now();
      const resources = ['/data/moments.json', '/data/descriptions.json'];
      const responses = await Promise.all(
        resources.map(async (url) => {
          const versionedUrl = `${url}?v=${timestamp}`;
          const response = await fetch(versionedUrl, { cache: 'no-store' });
          if (!response.ok) {
            throw new Error(`Fetch failed for ${url} (${response.status})`);
          }
          return response;
        })
      );

      responses.forEach((response) => response.body?.cancel());

      window.location.reload();
      return true;
    } catch (error) {
      console.error('Failed to refresh map data', error);
      return false;
    }
  }

  const ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'touchstart'];

  function attachActivityListeners() {
    if (typeof window === 'undefined') {
      return;
    }

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, scheduleReload, { passive: true });
    });
  }

  function detachActivityListeners() {
    if (typeof window === 'undefined') {
      return;
    }

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.removeEventListener(eventName, scheduleReload);
    });
  }

  onMount(() => {
    attachActivityListeners();
    scheduleReload();
  });

  onDestroy(() => {
    detachActivityListeners();
    clearReloadTimer();
  });
</script>

<svelte:head>
  <title>People's River Stories</title>
  <meta
    name="description"
    content="A community-driven map to share river memories, histories, and reflections along the world's waterways."
  />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://map.peoplesriverhistory.org/" />
  <meta property="og:title" content="People's River Stories" />
  <meta property="og:image" content={prs_sharing_image} />
  <meta
    property="og:description"
    content="A community-driven map to share river memories, histories, and reflections along the world's waterways."
  />
  <meta property="og:site_name" content="People's River Stories" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="People's River Stories" />
  <meta
    name="twitter:description"
    content="A community-driven map to share river memories, histories, and reflections along the world's waterways."
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
