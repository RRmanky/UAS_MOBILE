import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        fetchEvents()
    }

    private fun fetchEvents() {
        // Menggunakan Coroutines untuk background process
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.instance.getAllEvents()

                if (response.isSuccessful) {
                    val apiResponse = response.body()
                    val events = apiResponse?.data

                    // Log data ke console
                    events?.forEach { event ->
                        Log.d("API_TEST", "Event: ${event.title}, Status: ${event.status}")
                    }

                    Toast.makeText(this@MainActivity, "Berhasil load ${events?.size} events", Toast.LENGTH_SHORT).show()
                } else {
                    Log.e("API_TEST", "Error: ${response.code()}")
                }
            } catch (e: Exception) {
                Log.e("API_TEST", "Exception: ${e.message}")
                Toast.makeText(this@MainActivity, "Koneksi Gagal: ${e.message}", Toast.LENGTH_LONG).show()
            }
        }
    }
}