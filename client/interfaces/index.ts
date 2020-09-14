import { ReactNode } from "react";

export type User = {
    id: number;
    email: string;
    name: string;
    admin?: boolean;
    renew_password?: boolean;
    role: number;
    access_token?: string;
    tags: Array<string>;
    external_code?: string;
    phone_area?: string;
    phone?: string;
    created_at?: string;
    updated_at?: string;
};

export interface NotifyProps {
    open: boolean;
    message: string;
}

export interface LayoutProps {
    children?: ReactNode;
    title?: string;
}
