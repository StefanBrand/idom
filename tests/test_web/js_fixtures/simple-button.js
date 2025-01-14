import { h, render } from "https://unpkg.com/preact?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

export { h as createElement, render as renderElement };

export function unmountElement(container) {
  render(null, container);
}

export function SimpleButton(props) {
  return h(
    "button",
    {
      id: props.id,
      onClick(event) {
        props.onClick({ data: props.eventResponseData });
      },
    },
    "simple button"
  );
}
