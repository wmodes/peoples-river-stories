<div class="tooltip">
  <div class="tooltip__content">Click to add your story</div>
  <div class="tooltip__tail"></div>
</div>

<style>
  .tooltip {
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    pointer-events: auto;
    cursor: pointer;
  }

  .tooltip__content {
    background: black;
    color: var(--color-base);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 0.85rem;
    white-space: nowrap;
  }

  .tooltip__tail {
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid black;
    margin-left: -1px;
  }
</style>
