import { ComponentChildren, JSX } from 'preact';
import style from './style.module.css';

export function VisuallyHidden(props: {
	element?: keyof JSX.IntrinsicElements;
	children: ComponentChildren;
}) {
	const Container: keyof JSX.IntrinsicElements = props.element ?? 'div';
	return <Container class={style.visuallyHidden}>{props.children}</Container>;
}
