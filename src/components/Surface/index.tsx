import { ComponentChildren } from 'preact';
import style from './style.module.css';

export function Surface(props: { children: ComponentChildren }) {
	return <div class={style.surface}>{props.children}</div>;
}
