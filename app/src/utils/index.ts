export const range = (start: number, count: number): number[] => {
	return Array.apply(0, Array(count)).map((_, index) => index + start);
}

export * from './hooks';