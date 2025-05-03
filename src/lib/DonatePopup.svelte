<script lang="ts">
  import { writable } from 'svelte/store';

  const showToast = writable(true);

  const closeToast = () => {
    showToast.set(false);
  };
</script>

{#if $showToast}
  <div class="toast-container">
    <div class="toast">
      <div class="toast-message">
        <a
          href="https://peoplesriverhistory.org/"
          rel="noopener"
          target="_blank"
        >
          <span>EXPLORE</span> more river stories,</a
        >

        <a
          href="https://peoplesriverhistory.org/support/"
          rel="noopener"
          target="_blank"
        >
          or <span>SUPPORT</span> the project.</a
        >
      </div>
      <button class="toast-close" on:click={closeToast} aria-label="Close"
      ></button>
    </div>
  </div>
{/if}

<style>
  .toast-container {
    position: fixed;
    bottom: 0px;
    left: 9px;
    right: 70px;
    margin: 0;
    padding: 0;
    list-style-type: none;
    pointer-events: none;
    z-index: 9999;
  }
  .toast {
    width: fit-content;
    min-height: 3.5rem;
    margin-bottom: 0.5rem;
    padding: 0;
    background: black;
    color: #fff;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid var(--color-base);
    border-radius: 0.125rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    pointer-events: all;
    cursor: pointer;
    z-index: 999;
    position: relative;
  }
  .toast-message {
    padding: 0.75rem 3rem 0.75rem 0.5rem;
    flex: 1;
  }
  .toast-message a {
    color: var(--color-base);
    text-decoration: unset;
  }
  .toast-message a span {
    text-decoration: underline;
  }
  .toast-close {
    position: absolute;
    top: 4px;
    right: 4px;
    background: none;
    border: none;
    color: var(--color-base);
    cursor: pointer;
    font: 1rem sans-serif;
  }
  .toast-close::after {
    content: '✕';
  }
</style>
