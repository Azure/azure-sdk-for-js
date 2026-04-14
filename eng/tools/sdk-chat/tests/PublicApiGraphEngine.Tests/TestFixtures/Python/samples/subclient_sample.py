from sample_client import SampleClient


def main() -> None:
    client = SampleClient("https://example.com")
    widgets = client.widgets().list_widgets()
    print(len(widgets))


if __name__ == "__main__":
    main()
