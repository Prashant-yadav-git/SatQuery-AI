import { useState, useEffect } from 'react';

const BACKEND_URL_STORAGE_KEY = 'satquery_backend_url';

export interface InferenceResult {
  status: string;
  query: string;
  answer: string;
  metrics?: {
    confidence: number;
    coverage_area_sqkm?: number;
    cloud_cover?: string;
  };
  task?: string;
  model_version?: string;
}

export function getStoredBackendUrl(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(BACKEND_URL_STORAGE_KEY) || '';
}

export function setStoredBackendUrl(url: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BACKEND_URL_STORAGE_KEY, url.trim());
}

export async function queryModelInference(
  query: string,
  imageFile?: File | null,
  overrideUrl?: string
): Promise<InferenceResult> {
  const backendUrl = overrideUrl || getStoredBackendUrl();

  if (!backendUrl) {
    throw new Error('Inference service is currently offline.');
  }

  const formData = new FormData();
  formData.append('query', query);

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const endpoint = backendUrl.replace(/\/$/, '') + '/api/analyze';

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Inference server error: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as InferenceResult;
}
