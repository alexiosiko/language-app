import React from 'react';

const MinusIcon = ({ size = 28, onClick, className }: {
	size?: number,
	className?: string,
	onClick?: React.MouseEventHandler<HTMLImageElement> | undefined
}) => (
	<img
		onClick={onClick}
		className={`object-contain ${className}`}
		src="/icons/minus.png"
		alt="Minus Icon"
		width={size}
		height={size}
	/>
);

export default MinusIcon;
