import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние страницы (текущие настройки)
	const [pageState, setPageState] = useState(defaultArticleState);

	// Состояние формы (временные настройки)
	const [formState, setFormState] = useState(defaultArticleState);

	// Сбросить настройки
	const handleReset = () => {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	};

	// Применить настройки (копируем formState в pageState)
	const handleApply = () => {
		setPageState(formState);
		console.log('Настройки применены:', formState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formState={formState}
				setFormState={setFormState}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
