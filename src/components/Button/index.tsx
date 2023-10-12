import { ComponentChild, FunctionComponent, JSX } from 'preact';
import { PropsWithChildren } from 'preact/compat';
import { VisuallyHidden } from '../VisuallyHidden';
import style from './style.module.css';

export const IconButton: FunctionComponent<
	PropsWithChildren<
		Omit<JSX.IntrinsicElements['button'], 'icon'> & { icon: ComponentChild }
	>
> = ({ icon, children, ...props }) => (
	<button {...props} class={style.iconButton}>
		{icon}
		<VisuallyHidden>{children}</VisuallyHidden>
	</button>
);
