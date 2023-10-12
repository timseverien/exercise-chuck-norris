import { ComponentChildren } from 'preact';
import style from './style.module.css';
import { Surface } from '../Surface';

export function Card(props: {
	header?: ComponentChildren;
	children: ComponentChildren;
}) {
	return (
		<Surface class={style.card}>
			{props.header && <div class={style.header}>{props.header}</div>}
			<div class={style.content}>{props.children}</div>
		</Surface>
	);
}
