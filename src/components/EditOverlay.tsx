import { useEffect } from "react";

/**
 * Mounted only in `?edit=1`. Adds visual selection layer for any element
 * marked with [data-edit-text], [data-edit-image], [data-edit-list], [data-edit-num].
 * Communicates with parent window via postMessage.
 */
export function EditOverlay() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      [data-edit-text], [data-edit-image], [data-edit-list], [data-edit-num] {
        outline: 1px dashed transparent;
        outline-offset: 4px;
        transition: outline-color 120ms ease, background-color 120ms ease;
        cursor: pointer !important;
        position: relative;
      }
      [data-edit-text]:hover, [data-edit-image]:hover, [data-edit-list]:hover, [data-edit-num]:hover {
        outline-color: oklch(0.7 0.18 240);
        background-color: oklch(0.7 0.18 240 / 0.06);
      }
      [data-edit-selected="true"] {
        outline: 2px solid oklch(0.7 0.18 240) !important;
        outline-offset: 4px;
        background-color: oklch(0.7 0.18 240 / 0.08);
      }
      a[data-edit-text], a[data-edit-image], a[data-edit-list], a[data-edit-num] { pointer-events: auto; }
    `;
    document.head.appendChild(style);

    function findEditable(el: HTMLElement | null): HTMLElement | null {
      while (el && el !== document.body) {
        if (el.dataset.editText || el.dataset.editImage || el.dataset.editList || el.dataset.editNum) return el;
        el = el.parentElement;
      }
      return null;
    }

    function onClick(e: MouseEvent) {
      const target = findEditable(e.target as HTMLElement);
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      document.querySelectorAll('[data-edit-selected="true"]').forEach((n) => n.removeAttribute("data-edit-selected"));
      target.setAttribute("data-edit-selected", "true");
      const kind = target.dataset.editText ? "text"
        : target.dataset.editImage ? "image"
        : target.dataset.editList ? "list"
        : "num";
      const path = (target.dataset.editText || target.dataset.editImage || target.dataset.editList || target.dataset.editNum)!;
      const label = target.dataset.editLabel || path;
      const multiline = target.hasAttribute("data-edit-multiline");
      window.parent?.postMessage({ source: "pepa-edit", type: "select", kind, path, label, multiline }, "*");
    }

    document.addEventListener("click", onClick, true);
    window.parent?.postMessage({ source: "pepa-edit", type: "ready" }, "*");

    function onMsg(e: MessageEvent) {
      if (e.data?.source !== "pepa-admin") return;
      if (e.data.type === "scrollTo") {
        const el = document.querySelector(`[data-edit-${e.data.kind}="${e.data.path}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (e.data.type === "clearSelection") {
        document.querySelectorAll('[data-edit-selected="true"]').forEach((n) => n.removeAttribute("data-edit-selected"));
      }
    }
    window.addEventListener("message", onMsg);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("message", onMsg);
      style.remove();
    };
  }, []);
  return null;
}
