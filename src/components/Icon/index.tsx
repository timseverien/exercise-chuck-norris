import { Heart, HeartOff, RefreshCcw } from 'lucide-preact';
import { FunctionComponent } from 'preact';
import style from './style.module.css';

const iconMap = {
	refreshCcw: RefreshCcw,
	heart: Heart,
	heartOff: HeartOff,
};

export const Icon: FunctionComponent<{
	name: keyof typeof iconMap;
	size?: number;
}> = (props) => {
	const LucideIcon = iconMap[props.name];
	return (
		<LucideIcon class={style.icon} style={`--size: ${props.size ?? 1.25}em`} />
	);
};
