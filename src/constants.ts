interface I_ENV_MAPPINGS {
    [envName: string]: string;
}

export interface IBlocoLoaderConfig {
    immutable: boolean
    root?: string
    env: string
}

export const DEV:  string = 'development';
export const PROD: string = 'production';
export const STAG: string = 'staging';
export const TEST: string = 'test';

export const ENV_MAPPINGS: I_ENV_MAPPINGS = Object.freeze({
    dev: DEV,
    d: DEV,
    prod: PROD,
    p: PROD,
    stag: STAG,
    s: STAG,
    t: TEST
});

export const BLOCO_CONFIG_DEFAULTS: IBlocoLoaderConfig = {
    immutable: true,
    env: 'development'
}