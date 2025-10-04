<script lang="ts">
  import logo from '$lib/assets/PRS_LOGO2024.png';
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import InfoButton from './InfoButton.svelte';
  import AddButton from './AddButton.svelte';
  import AddTooltip from './AddTooltip.svelte';
  import {
    infoOverlayVisible,
    addOverlayVisible,
    activeMarkerCoords
  } from '../stores';

  let showTooltip = false;
  let lastMarkerKey: string | null = null;
  let tooltipTimer: ReturnType<typeof setTimeout> | null = null;

  function clearTooltipTimer() {
    if (tooltipTimer) {
      clearTimeout(tooltipTimer);
      tooltipTimer = null;
    }
  }

  function revealTooltip() {
    clearTooltipTimer();
    showTooltip = true;
  }

  function hideTooltip() {
    clearTooltipTimer();
    showTooltip = false;
  }

  function handleTooltipKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      hideTooltip();
    }
  }

  onMount(() => {
    tooltipTimer = setTimeout(() => {
      revealTooltip();
      tooltipTimer = null;
    }, 30000);
  });

  onDestroy(() => {
    clearTooltipTimer();
  });

  $: {
    if ($activeMarkerCoords) {
      const markerKey = `${$activeMarkerCoords.lng},${$activeMarkerCoords.lat}`;
      if (markerKey !== lastMarkerKey && !showTooltip) {
        revealTooltip();
      }
      lastMarkerKey = markerKey;
    } else {
      lastMarkerKey = null;
    }
  }

  function openInfoOverlay() {
    infoOverlayVisible.update(() => true);
  }
  function openAddOverlay() {
    hideTooltip();
    addOverlayVisible.update(() => true);
  }
</script>

<nav>
  {#if !$infoOverlayVisible}
    <button
      on:click={openInfoOverlay}
      class="overlay-trigger overlay-trigger--info"
      id="info"
      aria-label="open info overlay"
    >
      <InfoButton />
    </button>
  {/if}

  <div id="logo">
    <img src={logo} alt="" />
  </div>

  <button
    on:click={openAddOverlay}
    class="overlay-trigger overlay-trigger--add"
    id="add"
    aria-label="open add overlay"
  >
    {#if showTooltip}
      <div
        class="add-tooltip-wrapper"
        transition:fade
        on:click|stopPropagation={hideTooltip}
        on:keydown|stopPropagation={handleTooltipKeydown}
        role="button"
        tabindex="0"
        aria-label="Hide add tooltip"
      >
        <AddTooltip />
      </div>
    {/if}
    <AddButton />
  </button>
</nav>

<style>
  /****************************************************************************/
  /* The logo */
  /****************************************************************************/

  #logo {
    display: inline-block;
    position: absolute;
    text-align: center;
    top: 6px;
    width: 100%;
    margin: 0 auto;
    pointer-events: none;
    z-index: var(--logo-z-index);
  }
  @media (max-width: 800px) {
    #logo img {
      height: 51px;
    }
  }

  @media (min-width: 800px) {
    #logo img {
      width: 200px;
    }
  }

  /****************************************************************************/
  /* The menu buttons (info and add). */
  /****************************************************************************/
  .overlay-trigger {
    border: none;
    background-color: transparent;
    padding: 0;
    top: 0;
    font-size: 2.4em;
    cursor: pointer;
    font-weight: bold;
    position: fixed;
    z-index: var(--overlay-trigger-z-index);
    color: var(--color-dark);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }

  @media (min-width: 800px) {
    .overlay-trigger {
      top: 0.5em;
    }
  }
  /* Specifically for the info button  */
  .overlay-trigger.overlay-trigger--info {
    left: 9px;
    top: 9px;
  }

  /* Specifically for the add button  */
  .overlay-trigger.overlay-trigger--add {
    right: 9px;
    top: 9px;
  }

  .add-tooltip-wrapper {
    position: relative;
  }
</style>
