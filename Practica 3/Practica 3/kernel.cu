
#include "cuda_runtime.h"
#include "device_launch_parameters.h"

#include <iostream>


//Como se haria de manera tradicional
void suma_vectores(float *a, float *b, float *c, int n) {

	for (int i = 0; i < n; ++i) {
		c[i] = a[i] + b[i];
	}
}

//Ejecutado en la GPU y llamado por el procesador
__global__
void suma_vectores_gpu(float *a, float *b, float *c, int n) {
	// threadIdx.x --> nos dice dentro de cada bloque que hilo soy
	// blockIdx.x --> nos dice que bloque soy dentro de una malla
	// blockDim.x --> tamanyo del bloque

	//Ejercicio 3
	
	int idx_ = blockIdx.x * blockDim.x + threadIdx.x;
	if (idx_ < n) {
		
		c[idx_] = a[idx_] + b[idx_];
		
	}
	

	//Ejercicio 4
	
	/*int idx_ = blockIdx.x * blockDim.x + threadIdx.x;
	if (idx_ < n) {
		for (int i = idx_; i < n; i += blockDim.x * gridDim.x)
		{
			c[i] = a[i] + b[i];
		}
	}*/
	
	
}


int main(void) {
	
	cudaSetDevice(0);
	const int kNumElements = 30000000;
	const int kNumBytes = sizeof(float)*kNumElements;
	

	float *h_a_ = (float *)malloc(kNumBytes);
	float *h_b_ = (float *)malloc(kNumBytes);
	float *h_c_ = (float *)malloc(kNumBytes);

	if (h_a_ == NULL || h_b_ == NULL || h_c_ == NULL) {
		std::cerr << "Fallo al reservar memoria en host\n";
		getchar();
		exit(-1);
	}
	
	for (int i = 0; i < kNumElements; ++i) {
		h_a_[i] = rand() / (float)RAND_MAX;
		h_b_[i] = rand() / (float)RAND_MAX;

	}

	//Reservamos memorias en la tarjeta grafica
	float *d_a_ = NULL;
	float *d_b_ = NULL;
	float *d_c_ = NULL;

	cudaMalloc((void **)&d_a_, kNumBytes);
	cudaMalloc((void **)&d_b_, kNumBytes);
	cudaMalloc((void **)&d_c_, kNumBytes);

	//Transferimos a la memoria de la gpu
	cudaMemcpy(d_a_, h_a_, kNumBytes, cudaMemcpyHostToDevice);
	cudaMemcpy(d_b_, h_b_, kNumBytes, cudaMemcpyHostToDevice);

	int hilosPorBloque = 256;
	int bloquesPorGrid;
	
	//int bloquesPorGrid = (int)ceil((kNumElements / hilosPorBloque));
	if (kNumElements%hilosPorBloque == 0) {
		bloquesPorGrid = (kNumElements / hilosPorBloque);
	}
	else {
		bloquesPorGrid = (kNumElements / hilosPorBloque)+1;
	}

	
	//Sirve para calcular el numero maximo de bloques que se puede crear en un grid simultaneamente
	int numSMs;
	cudaDeviceGetAttribute(&numSMs, cudaDevAttrMultiProcessorCount, 0);
	
	dim3 tpb_(hilosPorBloque, 1, 1);
	dim3 bpg_(bloquesPorGrid, 1, 1);
	
	suma_vectores_gpu <<<bpg_, tpb_ >>> (d_a_, d_b_, d_c_, kNumElements);

	cudaError_t err_ = cudaGetLastError();

	if (err_ != cudaSuccess) {
		std::cerr << "Fallo al lanzar el kernel con erro" << cudaGetErrorString(err_) << "\n";
		getchar();
		exit(-1);
	}

	//copiando de gpu a cpu
	cudaMemcpy(h_c_, d_c_, kNumBytes, cudaMemcpyDeviceToHost);

	for (int i = 0; i < kNumElements; ++i) {

		if (fabs(h_a_[i] + h_b_[i] - h_c_[i]) > 1e-5) {
			std::cerr << "Error en la posicion " << i << "\n";
			getchar();
			exit(-1);
		}
	}

	cudaFree(d_a_);
	cudaFree(d_b_);
	cudaFree(d_c_);
	
	free(h_a_);
	free(h_b_);
	free(h_c_);

	cudaDeviceReset();


	std::cout << "Exito\n";
	
	getchar();
	return 0;


}