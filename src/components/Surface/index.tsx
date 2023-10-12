import { FunctionComponent, JSX } from 'preact';
import { PropsWithChildren } from 'preact/compat';
import style from './style.module.css';

export const Surface: FunctionComponent<
	PropsWithChildren<JSX.IntrinsicElements['div']>
> = ({ children, ...props }) => {
	return (
		<div {...props} class={`${style.surface} ${props.class ?? ''}`}>
			{children}
		</div>
	);
};
