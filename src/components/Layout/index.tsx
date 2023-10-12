import { FunctionComponent } from 'preact';
import { PropsWithChildren } from 'preact/compat';
import style from './style.module.css';

export const OverviewLayout: FunctionComponent<PropsWithChildren> = (props) => (
	<div class={style.overview}>{props.children}</div>
);
