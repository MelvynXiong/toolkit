import React, { ReactNode } from 'react';
import { Button, Dialog } from '@ali/wind';

interface Props {
  actionName: string;
  className?: string;
  text?: boolean;
  dialogTitle: ReactNode;
  dialogContent?: ReactNode;
  dialogClassName?: string;
  operation?: () => void;
  footer?: ReactNode;
  renderDialogContent?: (props: any) => ReactNode;
  style?: any;
  type?: 'primary' | 'secondary' | 'normal';
}

export default function OperationEntry({
  actionName,
  className,
  dialogTitle,
  dialogContent,
  dialogClassName,
  operation,
  text,
  footer,
  renderDialogContent,
  style,
  type,
}: Props) {
  function openDialog() {
    const dialog = Dialog.show({
      title: dialogTitle,
      content: renderDialogContent ? renderDialogContent({ onCancel }) : dialogContent,
      onOk: async () => {
        await operation();
      },
      footer,
      className: dialogClassName,
    });

    function onCancel() {
      dialog.hide();
    }
  }
  return (
    <Button
      onClick={openDialog}
      style={style}
      className={className}
      type={type || 'primary'}
      text={text}
    >
      {actionName}
    </Button>
  );
}
