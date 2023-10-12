import { FunctionComponent } from 'preact';
import { Heart, HeartOff, RefreshCcw } from 'lucide-preact';
import style from './style.module.css';

const iconMap = {
	refreshCcw: RefreshCcw,
	heart: Heart,
	heartOff: HeartOff,
};

export const Icon: FunctionComponent<{ name: keyof typeof iconMap }> = (
	props
) => {
	const LucideIcon = iconMap[props.name];
	return <LucideIcon class={style.icon} />;
};
