// components/note/ProcessStepper.jsx
// 표준 프로세스 단계 표시 컴포넌트
// 노트 상세 화면에서 현재 진행 단계 시각화

import { PROCESS_STEPS } from '../../data/dummy';
import styles from './ProcessStepper.module.css';

export default function ProcessStepper({ currentStep, onStepChange, readonly = false }) {
  return (
    <nav
      className={styles.stepper}
      aria-label="프로젝트 진행 단계"
    >
      {PROCESS_STEPS.map((step, index) => {
        const stepNum  = step.order;
        const isDone   = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        const isUpcoming = stepNum > currentStep;

        return (
          <div key={step.id} className={styles.stepWrapper}>
            {/* 연결선 (첫 번째 제외) */}
            {index > 0 && (
              <div
                className={`${styles.connector} ${isDone || isCurrent ? styles.connectorActive : ''}`}
                aria-hidden="true"
              />
            )}

            {/* 스텝 노드 */}
            <div className={styles.stepNode}>
              <button
                className={`
                  ${styles.stepCircle}
                  ${isDone    ? styles.stepDone    : ''}
                  ${isCurrent ? styles.stepCurrent : ''}
                  ${isUpcoming ? styles.stepUpcoming : ''}
                `}
                onClick={() => !readonly && onStepChange?.(stepNum)}
                disabled={readonly}
                aria-label={`${step.label.replace('\n', ' ')} 단계${isCurrent ? ' (현재)' : isDone ? ' (완료)' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span>{stepNum}</span>
                )}
              </button>

              <span
                className={`
                  ${styles.stepLabel}
                  ${isCurrent ? styles.stepLabelCurrent : ''}
                  ${isDone    ? styles.stepLabelDone    : ''}
                `}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
