export default function Form({
    className = '',
    children,
    onSubmit,
  }: {
    className?: string;
    children?: React.ReactNode;
    onSubmit?: (event: any) => void;
  }) {
    const handleOnSubmit = (event: any) => {
      if (onSubmit) {
        onSubmit(event);
      }
    };
  
    return <form className={className} onSubmit={(event) => handleOnSubmit(event)}>{children}</form>;
  }